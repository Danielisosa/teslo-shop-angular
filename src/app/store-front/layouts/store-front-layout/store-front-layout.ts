import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FrontNabvar } from "../../components/front-nabvar/front-nabvar";

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, FrontNabvar],
  templateUrl: './store-front-layout.html',
})
export class StoreFrontLayout { }
