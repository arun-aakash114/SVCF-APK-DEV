import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherbranchesPage } from './otherbranches.page';

describe('OtherbranchesPage', () => {
  let component: OtherbranchesPage;
  let fixture: ComponentFixture<OtherbranchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherbranchesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherbranchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
