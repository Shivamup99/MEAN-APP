import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})


export class CalenderComponent implements AfterViewInit {

  
  @ViewChild('startPicker') pickerStart;
  @ViewChild('endPicker') pickerEnd;

  DAY = 86400000;

  startOptions: FlatpickrOptions = {
    dateFormat: 'd.m.Y',
    minDate: new Date(),
  };

  endOptions: FlatpickrOptions = {
    dateFormat: 'd.m.Y',
    minDate: new Date(Date.now()),
  };

  form: FormGroup;


  constructor( 
    private formBuilder: FormBuilder
    ) {
    this.form = formBuilder.group({
      start: new Date(Date.now() - (this.DAY*30)),
      end: new Date()
    });

    // Start Date Changes
    this.form.controls.start.valueChanges.subscribe(changes => {
      if (!changes[0]) return;
      console.log('start: ', changes);
      const selectedDate = changes[0].getTime();
     // const monthLaterDate = selectedDate + (this.DAY*30);
      this.pickerEnd.flatpickr.set({
       // minDate: monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate),
        minDate: selectedDate + this.DAY*1
      });

    });

    // End Date Chang
    this.form.controls.end.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate = changes[0].getTime();
      this.pickerStart.flatpickr.set({
        maxDate: new Date( selectedDate - this.DAY)
      });

    });

  }

  ngAfterViewInit() {
    console.log(this.pickerStart);
  }

  
}
