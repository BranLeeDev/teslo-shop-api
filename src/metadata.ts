/* eslint-disable */
export default async () => {
    const t = {
        ["./common/modules/database/entities/images/image.entity"]: await import("./common/modules/database/entities/images/image.entity"),
        ["./common/modules/database/entities/products/product.entity"]: await import("./common/modules/database/entities/products/product.entity"),
        ["./common/modules/database/types/enums.type"]: await import("./common/modules/database/types/enums.type")
    };
    return { "@nestjs/swagger/plugin": { "models": [[import("./common/modules/database/entities/base.entity"), { "Base": { id: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } } }], [import("./common/modules/database/entities/products/product.entity"), { "Product": { name: { required: true, type: () => String }, slug: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, images: { required: true, type: () => [t["./common/modules/database/entities/images/image.entity"].Image] } } }], [import("./common/modules/database/entities/images/image.entity"), { "Image": { url: { required: true, type: () => String }, width: { required: true, type: () => Number }, height: { required: true, type: () => Number }, alt: { required: true, type: () => String }, type: { required: true, type: () => String }, sizeKb: { required: true, type: () => Number }, product: { required: true, type: () => t["./common/modules/database/entities/products/product.entity"].Product } } }], [import("./products/dtos/products/filter-product.dto"), { "FilterProductDto": { limit: { required: false, type: () => Number, maximum: 100, minimum: 1 }, offset: { required: false, type: () => Number, minimum: 0 } } }], [import("./products/dtos/products/create-product.dto"), { "CreateProductDto": { name: { required: true, type: () => String, minLength: 3, maxLength: 30 }, description: { required: true, type: () => String, minLength: 15, maxLength: 255 }, price: { required: true, type: () => Number, minimum: 0, maximum: 1000000 }, stock: { required: true, type: () => Number, minimum: 1 } } }], [import("./products/dtos/products/update-product.dto"), { "UpdateProductDto": {} }], [import("./images/dtos/images/filter-image.dto"), { "FilterImageDto": { limit: { required: false, type: () => Number, maximum: 100, minimum: 1 }, offset: { required: false, type: () => Number, minimum: 0 } } }], [import("./images/dtos/images/create-image.dto"), { "CreateImageDto": { url: { required: true, type: () => String, minLength: 11 }, width: { required: true, type: () => Number, minimum: 1 }, height: { required: true, type: () => Number, minimum: 1 }, alt: { required: true, type: () => String, minLength: 3, maxLength: 125 }, type: { required: true, enum: t["./common/modules/database/types/enums.type"].ImagesTypes }, sizeKb: { required: true, type: () => Number, minimum: 1 }, productId: { required: true, type: () => Number, minimum: 1 } } }], [import("./images/dtos/images/update-image.dto"), { "UpdateImageDto": {} }]], "controllers": [[import("./common/modules/seed/seed-controller/seed.controller"), { "SeedController": { "executeSeed": {} } }], [import("./products/controllers/products/products.controller"), { "ProductsController": { "findAll": {}, "create": { type: t["./common/modules/database/entities/products/product.entity"].Product }, "findProductByIdOrSlug": {}, "update": { type: t["./common/modules/database/entities/products/product.entity"].Product }, "delete": {} } }], [import("./images/controllers/images/images.controller"), { "ImagesController": { "getAllImages": { type: [t["./common/modules/database/entities/images/image.entity"].Image] }, "createImage": { type: t["./common/modules/database/entities/images/image.entity"].Image }, "updateImage": { type: t["./common/modules/database/entities/images/image.entity"].Image }, "deleteImage": {} } }]] } };
};