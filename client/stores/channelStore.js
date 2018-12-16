import { types, getRoot, destroy, flow } from "mobx-state-tree"

import Channel from './models/channelModel'
import { getChannels } from "./rest"
import { SELECTED, UNSELECTED } from "../constants"
const statusType = types.union(...[SELECTED, UNSELECTED].map(types.literal))

const ChannelStore = types
      .model({
        channels: types.array(Channel)
      })
      .views(self => ({
        get favoriteChannels() {
          return self.channels.filter(channel => channel.selected);
        }
      }))
      .actions(self => ({
        setChannels(channels) {
            self.channels = channels.map(channel => {
              const l_token = channel.qualities[0].logo_token || "";
              return {
                'id': channel.id,
                'title': channel.title,
                'logo_token': l_token,
                'selected': false
              }
            })
        },
        loadChannels: flow(function* (){
          self.state = "pending"
          try {
            const channels = yield getChannels();
            self.setChannels(channels)
            self.state = "done"
          } catch (error) {
            console.error("Failed to fetch projects", error)
            self.state = "error"
          }
        })
      }));
      
  export default ChannelStore;    