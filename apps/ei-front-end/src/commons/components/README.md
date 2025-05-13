# Components folder

This folder contains all ReactJS Components and its logic (This architecture decision applies to each component folder in the entire app ex: Component folder inside a module).

## Individual component architecture

```
componentName/: Component folder exposing index file.
|  ├── __tests__/: Component test folder.
|  ├── components/: Sub-components used in the main component.
|  |                (Each sub-component respect the component folder architecture).
|  ├── domain/: Business logic for component (Pure JavaScript/TypeScript).
|  ├── hooks/: ReactJS components hooks, ex: State, UseEffects, UseReducers, etc.
|  ├── typing/: Extra TypeScript interfaces and types.
|  └── utils/: Specific component utils.
|
|
├── index.tsx: Component exported.
├── props.ts: Props typing.
└── style.css: Component css styles.
```

## Component categories

Every subfolder here represents a category of components, here is its explanation.

### **Data Display**

Components that must show data:

- Avatar
- Badge
- Comment
- Collapse
- Carousel
- Card
- Calendar
- Description
- Empty
- Image
- List
- Popover
- Tooltip
- Timeline
- Tag
- Tabs
- Table

and similar.

### **Data entry**

Components that must handle data from users:

- Auto complete input
- Checkbox
- Cascader
- Date picker
- Form
- Input
- Input Number
- Mentions
- Rate
- Radio
- Switch
- Slider
- Select
- Tree Select
- Time Picker
- Upload Input
- Upload Space

and similar.

### **Feedback**

Components that must inform or confirm events to users:

- Alert
- Drawer
- Modal
- Message
- Notification
- Progress bar
- Pop Confirm
- Result
- Loader
- Skeleton

and similar.

### **General**

Common components:

- Button
- Icon
- Text
- Link
- Title

and similar.

### **Layout**

Components that compose UIs:

- Divider
- Grid
- Shell
- Space

and similar.

### **Navigation**

Components that help users to navigate:

- Breadcrumb
- Dropdown
- Fixed Button (Affix)
- Mobile Menu
- Side Bar
- Navigation Bar
- Pagination
- Page Header
- Steppers

### **Other**

Other components without clear categorization:

- Anchors
- Back to Top
- Logo

and similar.
