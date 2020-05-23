import { Component, OnInit } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Location } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";

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

  constructor(
    private http: HttpClient,
    private location: Location,
    private spinner: NgxSpinnerService
  ) {}

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
      this.spinner.show();
      this.caption = this.price.toLocaleString("en-GB") + " KM";
      let imageUrl = "";
      let params = new HttpParams();
      params = params.set("name", this.name);
      params = params.set("caption", this.caption);
      params = params.set("price", this.price.toString());
      params = params.set("description", this.description);
      this.imageUrls.forEach((url, index) => {
        if (index > 0) {
          imageUrl += ",";
        }
        imageUrl += url;
      });
      params = params.set("images", imageUrl);
      params = params.set("url", this.category);
      this.http
        .post("http://localhost:3000/dev/add-product", null, { params: params })
        .subscribe(
          (res) => {
            this.location.back();
            this.spinner.hide();
          },
          (error) => {
            console.log(error);
            this.spinner.hide();
          }
        );
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
    } else if (!this.category) {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please enter a product category",
        icon: "error",
      });
      isValid = false;
    } else if (this.imageUrls.length === 0) {
      // @ts-ignore
      Swal.fire({
        title: "Oops",
        text: "Please add at least one image",
        icon: "error",
      });
      isValid = false;
    }
    return isValid;
  }
}
