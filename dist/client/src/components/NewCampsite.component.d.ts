import { LngLat } from 'mapbox-gl';
declare type Props = {
    setAddNew: React.Dispatch<React.SetStateAction<boolean>>;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    addNew: boolean;
    currentLocation: LngLat;
};
declare const NewCampsite: ({ currentLocation, setModal, setAddNew, addNew, }: Props) => JSX.Element;
export default NewCampsite;
//# sourceMappingURL=NewCampsite.component.d.ts.map