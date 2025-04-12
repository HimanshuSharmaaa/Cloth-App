import React from 'react';
import Offer from "../../Components/Offer/Offer";
import Banner from '../../Components/Banner/Banner';
import NewCollection from '../../Components/NewCollections/NewCollections'
import ExclusiveOffer from "../../Components/ExclusiveOffer/ExclusiveOffer";

const Home = ({notify,setLoad}) => {
  return (
    <div>
      <Banner/>
      <NewCollection heading='POPULAR IN WOMENS' launch='New'/>
      <Offer notify={notify}/>
      <NewCollection heading='HOT TRENDS' launch='Hot'/>
      <ExclusiveOffer setLoad={setLoad} notify={notify}/>
      <NewCollection heading='NEWLY LAUNCH' launch='Popular'/>
    </div>
  )
}

export default Home;