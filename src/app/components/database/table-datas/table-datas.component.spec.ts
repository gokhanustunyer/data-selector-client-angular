import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatasComponent } from './table-datas.component';

describe('TableDatasComponent', () => {
  let component: TableDatasComponent;
  let fixture: ComponentFixture<TableDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
