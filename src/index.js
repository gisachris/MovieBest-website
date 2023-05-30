import _ from 'lodash';
//import '../assets/images/logoDone.png';
import './sass/styles.scss';

const caller = async () => {
  const baseUrl = 'https://api.tvmaze.com/'
  const resource = 'https://api.tvmaze.com/shows/14';
  const request = await fetch(resource)
  const responce = await request.json();
  console.log(responce);
}

caller();