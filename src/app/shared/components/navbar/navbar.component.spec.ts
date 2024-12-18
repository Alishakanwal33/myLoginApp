import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent] // Import the standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent); // Create the component
    component = fixture.componentInstance; // Assign the instance
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Basic test case for component creation
  });
});
