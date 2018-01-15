import Vue from 'vue';
import _ from 'lodash';
import './message.css'
let message = {
    
    install (Vue) {
        let that = this;
        Object.defineProperty(Vue.prototype,'$message',{
           value:function(msg){
                console.log(msg)
                that.init(msg)
           }
        })
    },
    init (msg) {
        let bodyEl = document.body;
        
        if(bodyEl.querySelector('.imessage')){
            return;
        }
        let el = this.createElement('div',{class:"imessage"},[msg]);
        bodyEl.appendChild(el);
        el.addEventListener('webkitAnimationEnd',function(){
            bodyEl.removeChild(el);
        })
    },
    createElement(type,props={},children){
        if(!_.isString(type)){
            console.error('first argument must be String');
            return;
        }
        let el = document.createElement(type);
        if(!_.isObject(props)){
            console.error('second argument must be Obejct');
            return;
        }
        for(let i in props){
            el.setAttribute(i,props[i]);
        }
        if(!_.isArray(children)){
            console.error('last argument must be Array');
        }
        if(children && children.length>0){
            children.forEach(item=>{
                if(_.isElement(item)){
                    el.appendChild(item)
                }else if (_.isString(item)){
                    el.innerText=item
                }else{
                    console.error('children must be string or dom node')
                }
            })
        }
        return el;
    }
}
export default message
