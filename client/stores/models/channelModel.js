import { types, getRoot, destroy } from "mobx-state-tree"

const Channel = types
				.model({
					id: types.string,
					title: types.string,
					logo_token: types.string,
					selected: false
				})
				.actions(self => ({
					toggle() {
						self.selected = !self.selected;
					},
				}))
							
export default Channel;