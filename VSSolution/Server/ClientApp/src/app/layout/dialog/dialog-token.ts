import { InjectionToken } from '@angular/core';
import { ComponentType } from '@angular/core/src/render3';

export const dialogToken = new InjectionToken<ComponentType<any>>('dialog-component');
