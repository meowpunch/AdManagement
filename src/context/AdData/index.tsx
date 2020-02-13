
import React from "react";


export type Advertisement = {
    id: number,
    title: string,
    body: string,
    ad_type: number,
    image: string,
    filename: string,
    url: string,
    start_time: string,
    end_time: string,
    state: number,
}

export type AdData = {
    advertisements: Array<Advertisement>
}

export const initialAdData: AdData = {
    advertisements: []
};

const AdData = React.createContext(initialAdData);

export default AdData;