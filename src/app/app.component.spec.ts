import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IgGridComponent, IgTextEditorComponent, IgDateEditorComponent,
	IgMaskEditorComponent, IgCurrencyEditorComponent, IgNumericEditorComponent,
	IgPercentEditorComponent, IgDatePickerComponent, IgComboComponent,
	IgTreeComponent, IgDialogComponent, IgDataChartComponent
} from 'igniteui-angular2';

describe('AppComponent', function () {
	let de: DebugElement;
	let comp: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		imports: [ BrowserModule , FormsModule ],
		declarations: [ AppComponent, IgGridComponent, IgTextEditorComponent, IgDateEditorComponent,
			IgMaskEditorComponent, IgCurrencyEditorComponent, IgNumericEditorComponent,
			IgPercentEditorComponent, IgDatePickerComponent, IgComboComponent,
			IgTreeComponent, IgDialogComponent, IgDataChartComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		comp = fixture.componentInstance;
		de = fixture.debugElement.query(By.css('h1'));
	});

	it('should create component', () => expect(comp).toBeDefined() );

});