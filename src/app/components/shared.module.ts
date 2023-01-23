import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ButtonComponent } from "./button/button.component";

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, IonicModule],
    exports: [ButtonComponent],
})

export class SharedModule{}