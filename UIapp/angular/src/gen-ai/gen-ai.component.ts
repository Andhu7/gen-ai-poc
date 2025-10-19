import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-gen-ai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers:[ApiserviceService],
  templateUrl: './gen-ai.component.html',
  styleUrl: './gen-ai.component.css'
})
export class GenAiComponent {
message:string = '';
prompt: string = '';
result: string = '';
loading: boolean = false;

constructor(private api:ApiserviceService){
this.api.getHello().subscribe((data)=>{
  this.message = data?.message;
})
}
generate() {
  if (!this.prompt.trim()) return;

  this.loading = true;
  this.api.generateText(this.prompt).subscribe({
    next: (res) => {
      this.result = res.result;
      this.loading = false;
    },
    error: () => {
      this.result = 'Error generating text';
      this.loading = false;
    }
  });
}

}



