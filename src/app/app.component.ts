import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavigationComponent } from "./layout/navigation/navigation.component";
import { LibraryComponent } from "./layout/library/library.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FontAwesomeModule, NavigationComponent, LibraryComponent]
})
export class AppComponent implements OnInit {
  title = 'spotify-clone-front';

  private faIconLibrary:FaIconLibrary=inject(FaIconLibrary)

  ngOnInit(): void {
    this.initFontAwesome()
  }

  initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }
}
