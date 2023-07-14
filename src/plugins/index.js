
import { Swipe, SwipeItem, Button, Sticky, Popup } from 'vant';

let vantComponents = [
    Swipe,
    SwipeItem,
    Button,
    Sticky,
    Popup,
]

export default function getVant(app) {
    vantComponents.forEach(item => {
        return app.use(item);
    })
}