import { getSnapshot, destroy, onSnapshot } from "mobx-state-tree"
import ChannelStore from "./channelStore"

let store;

export function createChannelStore(snapshot) {
    // kill old store to prevent accidental use and run clean up hooks
    if (store) destroy(store)

    // create new one
    store = ChannelStore.create(snapshot)

    return store;
}

