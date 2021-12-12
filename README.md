# README

To create the docker image:  
`docker build . -t sdearth/email-node-app`

Can build with version: 
`docker build . -t sdearth/email-node-app:1`

To start a container using the image:  
`docker run -p 3000:3000 -e PASS=<password> -e USER='sdfilter@gmail.com' -d sdearth/email-node-app`

To push the image to docker hub:  
`docker push <image-tag>`

## minikube commands

`minikube start`
`minikube status`
`minikube dashboard`

`kubectl` sends commands to cluster.

create a deployment:  
`kubectl create deployment email-app --image=sdearth/email-node-app`

List pods and deployments:  
`kubectl get deployments`
`kubectl get pods`

Create a service exposing the app port, using a loadbalancer;
`kubectl expose deployment email-app --port=3000 --type=LoadBalancer`

`kubectl get services`

Minikube doesn't automatically assign external IP. Use this command to 
allocate the IP and display it:
`minikube service email-app`

update a deployment:
`kubectl set image deployment/email-app email-node-app=sdearth/email-node-app:2`

Apply a declarative configuration:
`kubectl apply -f deployment.yaml`

Create a secret:
`kubectl create secret generic mail-cred --from-file=USER=./user.txt --from-file=PASS=./pass.txt`