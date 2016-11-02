/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TestBed }      from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { IgGridComponent, IgTextEditorComponent,
     IgDateEditorComponent, IgMaskEditorComponent,
      IgCurrencyEditorComponent, IgNumericEditorComponent,
      IgPercentEditorComponent, IgDatePickerComponent,
       IgComboComponent, IgTreeComponent,
        IgDialogComponent, IgDataChartComponent }
         from 'igniteui-angular2';

////////  SPECS  /////////////
export function main() {
/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

describe('AppComponent with TCB', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ BrowserModule , FormsModule ],
        declarations: [
         AppComponent, IgGridComponent, IgTextEditorComponent,
         IgDateEditorComponent, IgMaskEditorComponent,
         IgCurrencyEditorComponent, IgNumericEditorComponent,
         IgPercentEditorComponent, IgDatePickerComponent,
         IgComboComponent, IgTreeComponent,
         IgDialogComponent, IgDataChartComponent]});
  });

  it('should instantiate component', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });

  it('should have expected <h1> text', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

        h1 = fixture.debugElement.query(By.css('h1')).nativeElement; // preferred

    expect(h1.innerText).toMatch(/My IgniteUI Angular2 App/i, '<h1> should say something about "Angular App"');
  });
});
}
