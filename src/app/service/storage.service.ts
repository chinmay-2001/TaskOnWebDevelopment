// import { Injectable } from '@angular/core';
// const access_token = "access_token"

// @Injectable({
//     providedIn: 'root'
// })

// export class StorageService {
//     constructor() { }
//     clean(): void {
//         window.sessionStorage.clear()
//     }
//     saveUser(user: any) {
//         window.sessionStorage.removeItem(access_token)
//         window.sessionStorage.setItem(access_token, JSON.stringify(user))
//     }

//     public getUser(): any {
//         const user = window.sessionStorage.getItem(access_token)
//         if (user) {
//             return JSON.parse(user)
//         }
//     }
//     public isLoggedin(): boolean {
//         const user = window.sessionStorage.getItem(access_token)
//         return user ? true : false
//     }
// }
