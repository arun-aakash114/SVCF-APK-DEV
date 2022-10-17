import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BranchmembersPage } from './branchmembers.page';

describe('BranchmembersPage', () => {
  let component: BranchmembersPage;
  let fixture: ComponentFixture<BranchmembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchmembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchmembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
