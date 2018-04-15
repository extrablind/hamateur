import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class Storage {

  set = function(key, value) {
      this.setItem(key, JSON.stringify(value));
  }
  get = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
  }
}
