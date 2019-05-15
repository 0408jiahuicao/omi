import { WeElement } from 'omi';
import { MDCDismissibleDrawerFoundation } from '@material/drawer';
import '../icon';
interface Props {
    frame: boolean;
    dismissible: boolean;
    modal: boolean;
    show: boolean;
    heading: string;
    subHeading: string;
    lists: object;
}
interface Data {
}
export default class Drawer extends WeElement<Props, Data> {
    static css: any;
    static propTypes: {
        frame: BooleanConstructor;
        dismissible: BooleanConstructor;
        modal: BooleanConstructor;
        show: BooleanConstructor;
        heading: StringConstructor;
        subHeading: StringConstructor;
        lists: ObjectConstructor;
    };
    static defaultProps: {};
    drawerFoundation: MDCDismissibleDrawerFoundation;
    updated(): void;
    installed(): void;
    onList: (evt: any) => void;
    render(props: any): JSX.Element;
}
export {};
