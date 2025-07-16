import type { CollectionConfig } from "payload";

import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import type { ProductVariant } from "./ui/types";

import { admins } from "@/access/admins";
import { CallToAction } from "@/blocks/CallToAction/config";
import { Content } from "@/blocks/Content/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { slugField } from "@/fields/slug";
import { adminsOrPublished } from "@/access/adminsOrPublished";

import { deleteProductFromCarts } from "./hooks/deleteProductFromCarts";
import { revalidateProduct } from "./hooks/revalidateProduct";
import BulkProductUpload from "../../components/BulkProductUpload";
// import { $getRoot, $getSelection, createEditor } from 'lexical';


import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";


// function lexicalToPlainText(editorStateJSON: any): string {
//   const editor = createEditor(); // Create a temporary editor
//   let textContent = '';

//   editor.update(() => {
//     const editorState = editor.parseEditorState(editorStateJSON);
//     editor.setEditorState(editorState);
//     textContent = $getRoot().getTextContent();
//   });

//   return textContent;
// }


export const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: admins,
    delete: admins,
    read: adminsOrPublished,
    update: admins,
  },
  admin: {
    defaultColumns: ["title", "enableVariants", "_status", "variants.variants"],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/products/${typeof data?.slug === "string" ? data.slug : ""}`,
        });
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
      },
    },
    preview: (doc) =>
      generatePreviewPath({
        path: `/products/${typeof doc?.slug === "string" ? doc.slug : ""}`,
      }),
    useAsTitle: "title",
    components: {
      // Add bulk upload button to the products admin UI
      beforeListTable: [BulkProductUpload as any],
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "publishedOn",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "description",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
              required: false,
            },
            {
              name: "descriptionPlain",
              type: "text",
              admin: {
                readOnly: true,
              },
            },
            {
              name: "gallery",
              type: "upload",
              relationTo: "media",
              required: true,
              hasMany: true,
            },
            {
              name: "layout",
              type: "blocks",
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
          label: "Content",
        },
        {
          fields: [
            {
              name: "enableVariants",
              type: "checkbox",
            },
            {
              name: "variants",
              type: "group",
              admin: {
                condition: (data, siblingData) =>
                  Boolean(siblingData.enableVariants),
              },
              fields: [
                {
                  name: "options",
                  type: "array",
                  admin: {
                    components: {
                      RowLabel:
                        "@/collections/Products/ui/RowLabels/KeyLabel#KeyLabel",
                    },
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "label",
                          type: "text",
                          required: true,
                        },
                        {
                          name: "slug",
                          type: "text",
                          required: true,
                        },
                      ],
                    },
                    {
                      name: "values",
                      type: "array",
                      admin: {
                        components: {
                          RowLabel:
                            "@/collections/Products/ui/RowLabels/OptionLabel#OptionLabel",
                        },
                        initCollapsed: true,
                      },
                      fields: [
                        {
                          type: "row",
                          fields: [
                            {
                              name: "label",
                              type: "text",
                              required: true,
                            },
                            {
                              name: "slug",
                              type: "text",
                              required: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  label: "Variant options",
                  required: true,
                  minRows: 1,
                },
                {
                  name: "variants",
                  type: "array",
                  admin: {
                    components: {
                      RowLabel:
                        "@/collections/Products/ui/RowLabels/VariantLabel#VariantLabel",
                    },
                    condition: (data, siblingData) => {
                      return Boolean(siblingData?.options?.length);
                    },
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: "options",
                      type: "array",
                      admin: {
                        components: {
                          Field:
                            "@/collections/Products/ui/VariantSelect#VariantSelect",
                        },
                      },
                      fields: [
                        {
                          type: "row",
                          fields: [
                            {
                              name: "label",
                              type: "text",
                              required: true,
                            },
                            {
                              name: "slug",
                              type: "text",
                              required: true,
                            },
                          ],
                        },
                      ],
                      required: true,
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          name: "price",
                          type: "number",
                          required: true,
                        },
                        {
                          name: "stock",
                          type: "number",
                          admin: {
                            description:
                              "Define stock for this variant. A stock of 0 disables checkout for this variant.",
                            width: "50%",
                          },
                          defaultValue: 0,
                          required: true,
                        },
                      ],
                    },
                    {
                      name: "images",
                      type: "upload",
                      relationTo: "media",
                      hasMany: true,
                    },
                  ],
                  labels: {
                    plural: "Variants",
                    singular: "Variant",
                  },
                  required: true,
                  minRows: 1,
                  validate: (value, { siblingData }) => {
                    const variants =
                      (siblingData as { variants?: ProductVariant[] })
                        ?.variants || [];
                    if (variants.length) {
                      const hasDuplicate = variants.some(
                        (variant: ProductVariant, index) => {
                          // Check this against other variants
                          const dedupedArray = [...variants].filter(
                            (_, i) => i !== index
                          );

                          // Join the arrays then compare the strings, note that we sort the array before it's saved in the custom component
                          const test = dedupedArray.find(
                            (otherOption: ProductVariant) => {
                              const firstOption = otherOption?.options
                                ?.map((option) => option.slug)
                                .join("");
                              const secondOption = variant?.options
                                ?.map((option) => option.slug)
                                .join("");

                              return firstOption === secondOption;
                            }
                          );

                          return Boolean(test);
                        }
                      );

                      if (hasDuplicate) {
                        return "There is a duplicate variant";
                      }
                    }

                    return true;
                  },
                },
              ],
              label: false,
            },
            {
              name: "stock",
              type: "number",
              admin: {
                condition: (data) => !data.enableVariants,
                description:
                  "Define stock for this product. A stock of 0 disables checkout for this product.",
              },
              defaultValue: 0,
              required: true,
            },
            {
              name: "price",
              type: "number",
              required: true,
              admin: {
                condition: (data) => !data.enableVariants,
              },
            },
            {
              name: "relatedProducts",
              type: "relationship",
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: "products",
            },
          ],
          label: "Product Details",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "categories",
      type: "relationship",
      admin: {
        position: "sidebar",
        sortOptions: "title",
      },
      hasMany: true,
      relationTo: "categories",
    },
    slugField(),
    {
      name: "skipSync",
      type: "checkbox",
      admin: {
        hidden: true,
        position: "sidebar",
        readOnly: true,
      },
      label: "Skip Sync",
    },
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [deleteProductFromCarts],
    // beforeChange: [
    //   ({ data }) => {
    //     // Update the plain text version of the description on change
    //     if (data.description) {
    //       data.descriptionPlain = lexicalToPlainText(data.description);
    //     }
    //     return data;
    //   },
    // ],
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
};
