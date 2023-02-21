import{_ as o,u as h,s as u,o as m,c as d,a as e,n as a,b as t,t as c,F as p,r as _,d as b,e as f}from"./index-9097094c.js";const v={class:"profile-general-info"},x={class:"general-info-label-container"},D={class:"general-info-value-container"},U={__name:"BasicUserInfo",props:{currentUserData:Object},setup(n){const s=n,l=h(),{darkTheme:r}=u(l);return(i,g)=>(m(),d("div",v,[e("ul",x,[e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(r)}])}," Username    : ",2),e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(r)}])}," Email    : ",2),e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(r)}])}," Phone    : ",2),e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(r)}])}," Website    : ",2)]),e("ul",D,[e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(r)}])},c(s.currentUserData.username),3),e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(r)}])},c(s.currentUserData.email),3),e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(r)}])},c(s.currentUserData.phone),3),e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(r)}])},c(s.currentUserData.website),3)])]))}},y=o(U,[["__scopeId","data-v-bb47a50c"]]),$={class:"profile-general-info"},k={class:"general-info-label-container"},C={class:"general-info-value-container"},I={__name:"Company",props:{companyData:Object},setup(n){const s=h(),{darkTheme:l}=u(s);return(r,i)=>(m(),d(p,null,[e("p",{class:a(["company-name",{"theme-text":t(l)}])},"Company",2),e("div",$,[e("ul",k,[e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(l)}])}," Name    : ",2),e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(l)}])}," catchPharse    : ",2),e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(l)}])}," bs    : ",2)]),e("ul",C,[e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(l)}])},c(n.companyData.name),3),e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(l)}])},c(n.companyData.catchPhrase),3),e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(l)}])},c(n.companyData.bs),3)])])],64))}},T=o(I,[["__scopeId","data-v-ee41a8fb"]]),B={class:"profile-general-info"},P={class:"general-info-label-container"},j={class:"general-info-value-container"},O={__name:"Address",props:{addressData:Object},setup(n){const s=h(),{darkTheme:l}=u(s);return(r,i)=>(m(),d(p,null,[e("p",{class:a(["company-name",{"theme-text":t(l)}])},"Address",2),e("div",B,[e("ul",P,[e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(l)}])}," Street    : ",2),e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(l)}])}," Suit    : ",2),e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(l)}])}," City    : ",2),e("li",{class:a(["general-info-label",{"theme-label-text-lighter":t(l)}])}," Zip Code    : ",2)]),e("ul",j,[e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(l)}])},c(n.addressData.street),3),e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(l)}])},c(n.addressData.suite),3),e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(l)}])},c(n.addressData.city),3),e("li",{class:a(["general-info-value",{"theme-value-text-lighter":t(l)}])},c(n.addressData.zipcode),3)])])],64))}},S=o(O,[["__scopeId","data-v-d0d6ea5f"]]),A={class:"profile-container"},N={class:"profile-info-container"},z=["src","alt"],E={class:"address-info-container"},F={__name:"Profile",props:{currentUserData:Object},setup(n){const s=n,l=_({}),r=_({}),i=h(),{darkTheme:g}=u(i);return b(()=>{l.value=s.currentUserData.company,r.value=s.currentUserData.address}),(V,w)=>(m(),d("div",A,[e("div",N,[e("img",{src:s.currentUserData.profilepicture,alt:s.currentUserData.username,class:"profile-banner-img"},null,8,z),e("p",{class:a(["profile-name",{"theme-text":t(g)}])},c(s.currentUserData.name),3),f(y,{currentUserData:n.currentUserData},null,8,["currentUserData"]),f(T,{companyData:l.value},null,8,["companyData"])]),e("div",E,[f(S,{addressData:r.value},null,8,["addressData"])])]))}},R=o(F,[["__scopeId","data-v-8272b747"]]);export{R as default};
