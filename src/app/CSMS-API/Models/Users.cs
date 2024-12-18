namespace CSMS_API.Models
{
    public class Users
    {
		public string Username { get; set; }
		public string Password { get; set; }
        public string? Email { get; set; }
        public bool IsActive {get;set; }
	}

	public class Product
	{
		public string? P_Name { get; set; }
		public string? barcodenumber { get; set; }
		public decimal? P_Price { get; set; }
        public string? P_image { get; set; }
        public string? P_detail { get; set; }
    }
}
