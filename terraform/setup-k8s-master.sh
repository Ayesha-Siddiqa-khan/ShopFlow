#!/bin/bash
set -euo pipefail

echo "[Step 1] Installing Kubernetes v1.30 packages..."
mkdir -p /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | gpg --dearmor --batch --yes -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' > /etc/apt/sources.list.d/kubernetes.list
apt-get update -y
apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl
systemctl enable kubelet

echo "[Step 2] Initializing kubeadm control plane..."
kubeadm init --pod-network-cidr=192.168.0.0/16 --ignore-preflight-errors=NumCPU,Mem || true

echo "[Step 3] Configuring kubeconfig..."
mkdir -p /root/.kube /home/ubuntu/.kube
cp -f /etc/kubernetes/admin.conf /root/.kube/config
cp -f /etc/kubernetes/admin.conf /home/ubuntu/.kube/config
chown -R ubuntu:ubuntu /home/ubuntu/.kube

echo "[Step 4] Installing Calico CNI..."
export KUBECONFIG=/etc/kubernetes/admin.conf
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.0/manifests/calico.yaml

echo "[Step 5] Untainting control plane node to allow running workloads..."
NODE_NAME=$(kubectl get nodes -o jsonpath='{.items[0].metadata.name}')
kubectl taint nodes "$NODE_NAME" node-role.kubernetes.io/control-plane:NoSchedule- || true

echo "[Step 6] Installing ingress-nginx..."
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/baremetal/deploy.yaml

echo "[Step 7] Setting ingress-nginx controller to NodePort 30080 / 30443..."
kubectl -n ingress-nginx patch service ingress-nginx-controller --type merge -p '{"spec":{"type":"NodePort","ports":[{"name":"http","port":80,"targetPort":"http","nodePort":30080},{"name":"https","port":443,"targetPort":"https","nodePort":30443}]}}'

echo "KUBERNETES_CONTROL_PLANE_SETUP_COMPLETED"
