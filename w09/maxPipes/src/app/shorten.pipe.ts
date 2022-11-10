import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    //The Pipe decorator is required to give a name to your pipe and ID it for the app module
    name: 'shortenPipe'
}) 
export class ShortenPipe implements PipeTransform{
    //Must implement the PipeTransform module from angular/core
    //Because a pipe is "you put something in, you get something out" it must always return something.
    //    
    transform(value: any, limit: number) {
        if (value.length > limit) {
        return value.substr( 0, limit) + ' ...';
        } else {
            return value;
        }
    }
}