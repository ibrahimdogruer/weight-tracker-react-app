import React from 'react'
import { Timestamp } from "firebase/firestore";
import moment from 'moment'

export interface Weight {
    weight: string;
    userId: string;
    creationTime: Timestamp;
}

interface WeightCardProps {
    item: { id: string, data: Weight },
    deleteWeight: any;
    editWeight: any;
}

const WeightCard = ({ item, deleteWeight, editWeight }: WeightCardProps) => {
    return (
        <div className="card shadow mb-2" id={item.id} key={item.id}>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <span className="text-secondary fw-bold">{item.data.weight} kg</span>
                    <span className="text-secondary small fst-italic">{moment(item.data.creationTime.toDate()).fromNow()}</span>
                </div>
                <div className="d-flex align-items-center">
                    <button className="btn shadow btn-outline-secondary me-2" onClick={() => editWeight(item)}>
                        <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn shadow btn-outline-danger" onClick={() => deleteWeight(item.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WeightCard
