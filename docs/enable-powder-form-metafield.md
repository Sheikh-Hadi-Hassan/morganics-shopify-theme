# Enable Powder Form product metafield

The Powder Form control on product pages is intentionally product-specific.
It is no longer controlled by a global theme setting.

Create this Shopify product metafield definition:

- Shopify Admin path: Settings → Custom data → Products → Add definition
- Name: Enable Powder Form
- Namespace and key: `custom.enable_powder_form`
- Type: True or false

Theme behavior:

- `true`: show the Powder Form control only when the product also has at least one existing `Powder` variant.
- `false`, blank, or missing: hide the Powder Form control.
- Products without powder variants hide the control even when this metafield is checked.

Bulk editing:

After the definition exists, Shopify's product bulk editor can expose this field as a column so multiple products can be updated together.
