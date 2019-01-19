import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUersComponent } from './list-uers.component';

describe('ListUersComponent', () => {
  let component: ListUersComponent;
  let fixture: ComponentFixture<ListUersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
