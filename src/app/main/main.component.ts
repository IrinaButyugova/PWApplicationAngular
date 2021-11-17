import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
    selector: "main",
    templateUrl: "./main.component.html"
})

export class MainComponent{
    constructor(private authService: AuthService) {}

    public logout(): void {
        this.authService.logout$();
    }
}