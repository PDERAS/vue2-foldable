# Vue Loader
A vue.js component to allow a section to collapse and expand with an ainimation.

## How to initialize Vue Loader
Vue foldable is built as a vue plugin. It can be initialized just as the Vue documentation states.

```javascript
import Foldable from "@pderas/vue2-foldable";

Vue.use(Foldable, {
    peekabooHeight:  0, // default
});
```
## Usage

#### Creation
Vue foldable is easily created, and allows for a slot to be inserted.

```HTML
<foldable :collapsed="false">
    <div slot-scope>

    </div>
</foldable>
```

## Properties
| Property  | Required | Type    | Default | Description                                             |
|-----------|:--------:|:-------:|---------|---------------------------------------------------------|
| collapsed | true     | Boolean | n/a     | If the section is collapsed or not.                     |
| height    | false    | Number  | 0       | The height of foldable.                                 |
| minHeight | false    | Number  | 0       | The minimum height to show of the content.              |

## License
This project is covered under the MIT License. Feel free to use it wherever you like.
