import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.sass"],
})
export class AddProductComponent implements OnInit {
  price: number;

  imageUrls: string[] = [];
  name: string;
  caption: string;
  description: string;
  category: string;

  constructor() {}

  ngOnInit(): void {
    this.createUploadWidget();
  }

  private createUploadWidget() {
    // @ts-ignore
    var myWidget = cloudinary.createUploadWidget(
      {
        cloudName: "dabzpoi4v",
        uploadPreset: "z9fyd6c0",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          this.imageUrls.push(result.info.secure_url);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  save() {
    if (this.clientValidation()) {
      this.caption = this.price.toLocaleString('en-GB') + ' KM';
      // Add Product
    }
  }

  private clientValidation(): boolean {
    let isValid = true;
    if (!this.name || this.name == "") {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter a product name",
        icon: "error",
      });
      isValid = false;
    } else if (!this.description || this.description == "") {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter a product description",
        icon: "error",
      });
      isValid = false;
    } else if (!this.price) {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter a product price",
        icon: "error",
      });
      isValid = false;
    }
    return isValid;
  }
}
