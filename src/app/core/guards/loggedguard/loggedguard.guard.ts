import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const id = inject(PLATFORM_ID)

  if(isPlatformBrowser(id)){
    if(localStorage.getItem('socialToken') !== null){
      router.navigate(['/timeline'])
      return false
    }else{
      return true
    }
  }else{
    return true;

  }
};
