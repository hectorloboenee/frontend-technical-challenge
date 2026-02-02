import {defineStore} from "pinia";
import type {UserDto} from "../common/types/user-dto.ts";

export const useUserStore = defineStore('user', {
    state: (): UserDto => ({id: undefined, name: undefined}),
    getters: {
        user: (state) => state
    },
    actions: {
        createUser(user: UserDto) {
            this.id = user.id;
            this.name = user.name;
        },
        logout() {
            this.id = undefined;
            this.name = undefined;
        }
    }
})