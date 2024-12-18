using System.Data.SqlClient;
using CSMS_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CSMS_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly string connectionString = "Server=DESKTOP-9FKSVCE; Database=CSMS; Integrated Security=True; Encrypt=True; TrustServerCertificate=True;";

		[HttpPost("Login")]
		public IActionResult Login([FromBody] Users credentials)
		{
			if (credentials == null || string.IsNullOrEmpty(credentials.Username) || string.IsNullOrEmpty(credentials.Password))
			{
				return BadRequest("Username and password are required.");
			}

			try
			{
				using (SqlConnection conn = new SqlConnection(connectionString))
				{
					conn.Open();
					using (SqlCommand cmd = new SqlCommand("SELECT * FROM Users WHERE Username = @Username AND Password = @Password and isactive = 1", conn))
					{
						cmd.Parameters.AddWithValue("@Username", credentials.Username);
						cmd.Parameters.AddWithValue("@Password", credentials.Password);

						SqlDataReader reader = cmd.ExecuteReader();

						if (reader.HasRows)
						{
							// Assuming you're getting the first row if login is successful
							reader.Read();

							// You can retrieve data from the columns here if needed
							var userId = reader["ID"]; // example of accessing a column

							return Ok(new { Message = "Login successful", UserID = userId });
						}
						else
						{
							return Unauthorized("Invalid username or password.");
						}
					}
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while processing your request.");
			}
		}

		[HttpPost("GetProductByBarcodeNumber")]
		public IActionResult GetProductByBarcodeNumber([FromBody] Product product)
		{

			try
			{
				using (SqlConnection conn = new SqlConnection(connectionString))
				{
					conn.Open();
					using (SqlCommand cmd = new SqlCommand("SELECT *  FROM [Products] where barcodenumber = @barcodenumber", conn))
					{
						cmd.Parameters.AddWithValue("@barcodenumber", product.barcodenumber);


						SqlDataReader reader = cmd.ExecuteReader();

						if (reader.HasRows)
						{
							// Assuming you're getting the first row if login is successful
							reader.Read();
							// You can retrieve data from the columns here if needed
							// Retrieve data from the columns
							var productName = reader["P_Name"].ToString();
							var productPrice = Convert.ToDecimal(reader["P_Price"]);
							var productImage = reader["P_image"].ToString();
							var productDetail = reader["P_detail"].ToString();


							// Create an instance of the Product class
							var p = new Product
							{
								P_Name = productName,
								P_Price = productPrice,
								P_detail = productDetail,
								P_image = productImage
							};


							// example of accessing a column

							return Ok(new { Message = "Scan Successful", productDetails = p });
						}
						else
						{
							return Unauthorized("Barcode not identified");
						}
					}
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while processing your request.");
			}
		}
		[HttpPost("Register")]
		public IActionResult Register([FromBody] Users credentials)
		{
			if (credentials == null || string.IsNullOrEmpty(credentials.Username) || string.IsNullOrEmpty(credentials.Password))
			{
				return BadRequest("Username and password are required.");
			}

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();

                    // Check if the username already exists
                    using (SqlCommand checkCmd = new SqlCommand("SELECT COUNT(*) FROM Users WHERE Username = @Username", conn))
                    {
                        checkCmd.Parameters.AddWithValue("@Username", credentials.Username);
                        int userExists = (int)checkCmd.ExecuteScalar();

                        if (userExists > 0)
                        {
                            return Conflict("Username already exists. Please choose a different username.");
                        }
                    }

                    // Insert the new user into the Users table
                    using (SqlCommand cmd = new SqlCommand("INSERT INTO Users (Username, Password,Email, IsActive) VALUES (@Username, @Password,@Email, @IsActive); SELECT SCOPE_IDENTITY();", conn))
                    {
                        cmd.Parameters.AddWithValue("@Username", credentials.Username);
                        cmd.Parameters.AddWithValue("@Password", credentials.Password);
						cmd.Parameters.AddWithValue("@Email", credentials.Email);
                        cmd.Parameters.AddWithValue("@IsActive", 1); // Assuming new users are active by default

                        // Execute the insert command and retrieve the new user's ID
                        var newUserId = cmd.ExecuteScalar();

                        return Ok(new { Message = "Registration successful", UserID = newUserId });
                    }
                }
            }
			catch (Exception ex)
			{
                Console.WriteLine(ex.Message);
                return StatusCode(500, "An error occurred while processing your request.");
			}
		}

     }

}



