import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Trash2, Edit2, Plus } from "lucide-react";

export default function AdminShop() {
  const { user, loading: authLoading } = useAuth();
  const { data: products, isLoading, refetch } = trpc.products.list.useQuery();
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

  // Verificar se é admin
  if (!authLoading && user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground">Você não tem permissão para acessar esta página</p>
        </div>
      </div>
    );
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

      setFormData({ name: "", description: "", price: "", imageUrl: "", category: "", stock: "0" });
      setEditingId(null);
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    }
  };

  const handleEdit = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      imageUrl: product.imageUrl || "",
      category: product.category || "",
      stock: product.stock?.toString() || "0",
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await deleteProduct.mutateAsync({ id });
        refetch();
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        alert("Erro ao deletar produto");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950">
      <div className="container py-20">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
            Admin - Loja <span className="text-accent">Lumina</span>
          </h1>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          {showForm && (
            <div className="lg:col-span-1">
              <Card className="bg-white/5 border-accent/20 p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingId ? "Editar Produto" : "Novo Produto"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Nome *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-accent/30 rounded text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Descrição</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-accent/30 rounded text-white"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Preço (R$) *</label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-accent/30 rounded text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">URL da Imagem</label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-accent/30 rounded text-white"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Categoria</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-accent/30 rounded text-white"
                      placeholder="ex: Baralho Cigano"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Estoque</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-accent/30 rounded text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
                      {editingId ? "Atualizar" : "Criar"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                        setFormData({ name: "", description: "", price: "", imageUrl: "", category: "", stock: "0" });
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          )}

          {/* Lista de Produtos */}
          <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
            {isLoading ? (
              <div className="text-center text-muted-foreground">Carregando produtos...</div>
            ) : products && products.length > 0 ? (
              <div className="space-y-4">
                {products.map((product: any) => (
                  <Card key={product.id} className="bg-white/5 border-accent/20 p-6">
                    <div className="flex gap-6">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-32 h-32 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                        {product.description && (
                          <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                        )}
                        <div className="flex gap-4 text-sm">
                          <span className="text-accent font-bold">R$ {parseFloat(product.price).toFixed(2)}</span>
                          {product.category && <span className="text-muted-foreground">{product.category}</span>}
                          <span className="text-muted-foreground">Estoque: {product.stock}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(product)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleDelete(product.id)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                          Deletar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                Nenhum produto cadastrado. Crie o primeiro clicando em "Novo Produto"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
