import { OrderByDirection, Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from 'react'
import WeightCard, { Weight } from "../components/WeightCard";
import { auth, db } from '../firebase';

import { AuthContext } from '../contexts/AuthProvider';
import moment from 'moment';
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [weight, setWeight] = useState('');
    const [weights, setWeights] = useState<{ id: string, data: Weight }[]>([]);
    const [loading, setLoading] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editDocValue, setEditDocValue] = useState<{ id: string, data: Weight }>(null);

    const [sortBy, setSortBy] = useState<OrderByDirection>('desc');

    useEffect(() => {
        setLoading(true);
        const q = query(collection(db, 'Weights'), where('userId', '==', user!.uid), orderBy('creationTime', sortBy))
        onSnapshot(q, (querySnapshot) => {
            setWeights(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data() as Weight
            })))
            setLoading(false);
        })
    }, [sortBy])

    const createOrEditWeight = async (e) => {
        e.preventDefault();

        if (editDocValue && editDocValue.id) {
            await handleEditWeight(editDocValue.id);
        } else {
            await addWeight();
        }
    }

    const addWeight = async () => {
        if (weight && +weight > 0) {
            await addDoc(collection(db, "Weights"), {
                weight: weight,
                userId: user!.uid,
                creationTime: Timestamp.now()
            }).then(() => {
                console.log('Weight added');
                setWeight('');
                // toast.success('Weight added successfully');
            }).catch(error => {
                console.log(error.message);
                toast.error(error.message);
            });
        } else {
            toast.error('Weight cannot be 0');
        }
    }

    const handleEditWeight = async (id: string) => {
        if (weight && +weight > 0) {
            await updateDoc(doc(db, 'Weights', id), {
                weight: weight,
                userId: user!.uid,
                creationTime: Timestamp.now()
            }).then(() => {
                console.log('Updated');
                setEditDocValue(null);
                setWeight('');
                setEditMode(false);
                toast.success('Weight edited successfully');
            }).catch(err => {
                console.log(err.message);
                toast.error(err.message);
            })
        }
    }

    const editWeight = (item: { id: string, data: Weight }) => {
        setEditDocValue(item);
        setWeight(item.data.weight);
        setEditMode(true);
    }

    const deleteWeight = async (id: string) => {
        await deleteDoc(doc(db, 'Weights', id)).then(() => {
            console.log('Deleted');
            toast.success('Weight deleted successfully');
        }).catch(err => {
            console.log(err.message);
            toast.error(err.message);
        })
    }

    return (
        <div className="container">
            <div className='d-flex justify-content-center'>
                <div className="col-6">
                    <h3 className="my-4">Weigths</h3>

                    {/* begin:: Add Weight From */}
                    <form className="d-flex align-items-center" onSubmit={createOrEditWeight}>
                        <input className="form-control shadow me-2 w-75" type="number" placeholder="Enter Weight" min={0}
                            value={weight} onChange={(e) => setWeight(e.target.value)} />
                        <button className="btn shadow btn-primary" type="submit">{!editMode ? 'Add Weight' : 'Edit Weight'}</button>
                    </form>
                    {/* end:: Add Weight From */}
                    <div className="w-100 my-4" style={{ height: '1px', backgroundColor: '#eee' }}></div>

                    {/* begin:: Sort By Button */}
                    <div className="d-flex justify-content-end mb-2">
                        <button className="btn shadow btn-outline-secondary" onClick={() => setSortBy(sortBy === 'asc' ? 'desc' : 'asc')}>
                            {sortBy === 'asc'
                                ? <i className="fa fa-sort-amount-asc"></i>
                                : <i className="fa fa-sort-amount-desc"></i>
                            }
                        </button>
                    </div>
                    {/* end:: Sort By Button */}

                    {loading && <h6>Loading...</h6>}

                    {!loading && weights?.length <= 0 && <h6> No Data</h6>}

                    {!loading && weights?.length > 0 && weights?.map(item => (
                        <WeightCard key={item.id} item={item} deleteWeight={deleteWeight} editWeight={editWeight} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Home
