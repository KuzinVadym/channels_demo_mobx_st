import PathUrls from '../../resources/path-utils';
import Headers from '../../resources/headers';

const Header = new Headers(); 
const Path = new PathUrls(); 

/* Load Channels */
const getChannelsUrl = `${Path.channelsPath()}`;
const getChannelsHeader = ()=> (Header.getHeader());
export const getChannels = () => fetch(getChannelsUrl, getChannelsHeader()).then(response => response.json());
/* Load Channels End*/
