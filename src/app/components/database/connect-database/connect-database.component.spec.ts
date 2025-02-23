import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectDatabaseComponent } from './connect-database.component';

describe('ConnectDatabaseComponent', () => {
  let component: ConnectDatabaseComponent;
  let fixture: ComponentFixture<ConnectDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
