export class Product {
  id?: string;
  object?: string;
  active?: boolean;
  attributes?: string[];
  caption?: string;
  created?: number;
  description?: string;
  images?: string[];
  livemode?: boolean;
  metadata?: any;
  name?: string;
  package_dimensions?: any;
  shippable?: boolean;
  type?: string;
  updated?: number;
  url?: string;

  constructor(
    id?: string,
    object?: string,
    active?: boolean,
    attributes?: string[],
    caption?: string,
    created?: number,
    description?: string,
    images?: string[],
    livemode?: boolean,
    metadata?: any,
    name?: string,
    package_dimensions?: any,
    shippable?: boolean,
    type?: string,
    updated?: number,
    url?: string
  ) {
    this.id = id;
    this.object = object;
    this.active = active;
    this.attributes = attributes;
    this.caption = caption;
    this.created = created;
    this.description = description;
    this.images = images;
    this.livemode = livemode;
    this.metadata = metadata;
    this.name = name;
    this.package_dimensions = package_dimensions;
    this.shippable = shippable;
    this.type = type;
    this.updated = updated;
    this.url = url;
  }
}

export class ProductResponseModel {
  constructor(
    public data?: Product[]
  ) {}
}