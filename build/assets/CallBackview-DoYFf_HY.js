import{w as c,r as l,j as e}from"./index-_oFzRGsN.js";import{a as x}from"./logo-CSkKVHs_.js";import{Q as o}from"./ReactToastify-iM3XEq0i.js";import{m as t}from"./proxy-xutnNBsr.js";import"./clsx-B-dksMZM.js";var m={};const f=()=>{const{id:i}=c(),r=localStorage.getItem("user"),a=JSON.parse(r);a._id,console.log("NewProfile",a);const[h,u]=l.useState(!0),[s,d]=l.useState({}),n=async()=>{const p=await x.get(`${m.REACT_APP_BACKEND_API}/callback-1/${i}`);d(p.data)};return console.log(s),l.useEffect(()=>{n()},[]),e.jsx(e.Fragment,{children:e.jsxs(t.div,{className:" main-container1 container mb-5 ",children:[e.jsx(o,{}),e.jsxs("div",{className:"container margin-container shadow-lg mb-5",children:[e.jsx(t.h2,{className:"  fw-bold",children:"CallBack"}),e.jsx(t.div,{children:e.jsxs("form",{children:[e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"Name"}),e.jsx("div",{style:{marginLeft:"27px"},children:e.jsx("input",{type:"text",disabled:!0,placeholder:s.name})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"Email"}),e.jsx("div",{style:{marginLeft:"30px"},children:e.jsx("input",{type:"email",disabled:!0,placeholder:s.email})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"Phone"}),e.jsx("div",{className:"ms-4",children:e.jsx("input",{type:"number",disabled:!0,placeholder:s.phone})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"transferTo"}),e.jsx("div",{children:e.jsx("input",{type:"text",disabled:!0,placeholder:s.transferTo})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"domainName"}),e.jsx("div",{children:e.jsx("input",{type:"text",disabled:!0,placeholder:s.domainName})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"address"}),e.jsx("div",{style:{marginLeft:"16px"},children:e.jsx("input",{type:"text",disabled:!0,placeholder:s.address})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"country"}),e.jsx("div",{style:{marginLeft:"20px"},children:e.jsx("input",{type:"text",disabled:!0,placeholder:s.country})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"zipcode"}),e.jsx("div",{style:{marginLeft:"17px"},children:e.jsx("input",{type:"text",disabled:!0,placeholder:s.zipcode})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"comments"}),e.jsx("div",{children:e.jsx("textarea",{minLength:"6",type:"text",disabled:!0,placeholder:s.comments,style:{width:"700px",height:"70px"}})})]}),e.jsxs("div",{className:"input-group mb-2",style:{gap:"20px"},children:[e.jsx("label",{children:"buget"}),e.jsx("div",{style:{marginLeft:"27px"},children:e.jsx("input",{type:"text",disabled:!0,placeholder:s.buget})})]})]})})]})]})})};export{f as default};
