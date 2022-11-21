import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { BookStoreComponent } from "../book-store.component";

@Injectable()
export class StoreFirstGuard implements CanActivate {
    private firstNavigation = true;

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        if (!this.firstNavigation) return true;
        this.firstNavigation = false;
        if (route.component !== BookStoreComponent) {
            this.router.navigateByUrl('/book-list');
            return false;
        }
        return true;
    }
}