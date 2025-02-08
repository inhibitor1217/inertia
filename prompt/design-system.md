## Design System Notes

We are using @channel.io/bezier-react v3, a React component library that implements Bezier design system.

### Typography System

- Use the `Text` component from bezier-react for all text elements
- Typography scale uses numeric values: "11" through "36"
- Each typography size includes predefined:
  - font-size
  - line-height
  - letter-spacing (for some sizes)
- Common sizes:
  - "11": 11px/16px
  - "13": 13px/18px
  - "15": 15px/20px (with letter-spacing)
  - "22": 22px/28px (with letter-spacing)
  - "30": 30px/36px (with letter-spacing)
- Props:
  - `typo`: Typography scale value (e.g., "15", "22")
  - `as`: HTML element to render as (e.g., "h1", "p", "span")
  - `color`: Color token
  - `bold`: Boolean for font weight
  - `italic`: Boolean for font style

### Color Token Usage

- Color tokens are constructed by concatenating nested keys from the token metadata with `-`
- Example: `bg.header` in metadata becomes `var(--bg-header)`
- No need to prefix with `bz-color`
- Common tokens:
  - `bg-header`: White header background
  - `bg-black-lighter`: Light gray background
  - `bdr-black-light`: Light border color
