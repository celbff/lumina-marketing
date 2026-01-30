import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Trash2, Edit2, Plus } from "lucide-react";

export default function AdminShop() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLocation("/admin/login");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [setLocation]);

  const { data: products, isLoading: productsLoading, refetch } = trpc.products.list.useQuery();
  const createProduct = trpc.products.create.useMutation();
  const updateProduct = trpc.products.update.useMutation();
  const deleteProduct = trpc.products.delete.useMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    stock: "0",
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setLocation("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateProduct.mutateAsync({
          id: editingId,
          ...formData,
          stock: parseInt(formData.stock) || 0,
        } as any);
      } else {
        await createProduct.mutateAsync({
          ...formData,
          stock: parseInt(formData.stock) || 0,
        } as any);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: "", description: "", price: "", imageUrl: "", category: "", stock: "0" });
      refetch();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl || "",
      category: product.category || "",
      stock: product.stock.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await deleteProduct.mutateAsync({ id });
        refetch();
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950">
      <div className="container py-20">
        {/* Header com logout */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
            Gerenciar <span className="text-accent">Produtos</span>
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setEditingId(null);
                  setFormData({ name: "", description: "", price: "", imageUrl: "", category: "", stock: "0" });
                }
              }}
              className="bg-accent hover:bg-accent/90 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Formulário de novo produto */}
        {showForm && (
          <Card className="p-6 mb-8 bg-slate-900/50 border-accent/30">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingId ? "Editar Produto" : "Novo Produto"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nome do Produto"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 bg-slate-800/50 border border-accent/30 rounded-lg text-white placeholder:text-muted-foreground"
                  required
                />
                <input
                  type="number"
                  placeholder="Preço (R$)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-2 bg-slate-800/50 border border-accent/30 rounded-lg text-white placeholder:text-muted-foreground"
                  required
                />
              </div>
              <textarea
                placeholder="Descrição"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800/50 border border-accent/30 rounded-lg text-white placeholder:text-muted-foreground"
                rows={3}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="URL da Imagem"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="px-4 py-2 bg-slate-800/50 border border-accent/30 rounded-lg text-white placeholder:text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Categoria"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-4 py-2 bg-slate-800/50 border border-accent/30 rounded-lg text-white placeholder:text-muted-foreground"
                />
                <input
                  type="number"
                  placeholder="Estoque"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="px-4 py-2 bg-slate-800/50 border border-accent/30 rounded-lg text-white placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  {editingId ? "Atualizar" : "Criar"} Produto
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ name: "", description: "", price: "", imageUrl: "", category: "", stock: "0" });
                  }}
                  className="bg-slate-700 hover:bg-slate-600"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Lista de produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsLoading ? (
            <p className="text-muted-foreground">Carregando produtos...</p>
          ) : products && products.length > 0 ? (
            products.map((product: any) => (
              <Card key={product.id} className="p-4 bg-slate-900/50 border-accent/30 hover:border-accent/60 transition">
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-accent font-bold">R$ {parseFloat(product.price).toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">Estoque: {product.stock}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">Nenhum produto cadastrado</p>
          )}
        </div>
      </div>
    </div>
  );
}
