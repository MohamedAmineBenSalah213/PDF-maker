import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-settings',
  templateUrl: './image-settings.component.html',
  styleUrls: ['./image-settings.component.css']
})
export class ImageSettingsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Create a FileReader to read the selected image file
    const reader = new FileReader();

    reader.onload = (e) => {
      // Set the imageUrl to the data URL of the selected image
      this.imageUrl = e.target?.result as string;
    };

    // Read the selected image as a data URL
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    if (this.selectedFile) {
      // Perform the image upload or any other actions here
      console.log('Selected image:', this.selectedFile);
    }
  }
}
