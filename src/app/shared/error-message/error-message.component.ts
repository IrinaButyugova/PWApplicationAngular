import { Component, Input } from "@angular/core";

@Component({
  selector: "error-message",
  templateUrl: "./error-message.component.html",
})
export class ErrorMessageComponent {
  @Input("message") messageProps: string | null = "Something went wrong";
}
