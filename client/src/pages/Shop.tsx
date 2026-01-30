import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Trash2, MessageCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

interface CartItem {
  productId: number;
  name: string;
  price: string;
  quantity: number;
}

export default function Shop() {
  const { user } = useAuth();
  const { data: products, isLoading } = trpc.products.list.useQuery();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shippingCost, setShippingCost] = useState("0");
  const [showCart, setShowCart] = useState(false);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("lumina_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem("lumina_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const total = subtotal + parseFloat(shippingCost);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const message = `Olá! Gostaria de fazer um pedido:\n\n${cart.map(item => `${item.name} (x${item.quantity}) - R$ ${(parseFloat(item.price) * item.quantity).toFixed(2)}`).join("\n")}\n\nSubtotal: R$ ${subtotal.toFixed(2)}\nFrete: R$ ${parseFloat(shippingCost).toFixed(2)}\nTotal: R$ ${total.toFixed(2)}\n\nPor favor, confirme o pedido e envie os dados para pagamento por PIX.`;

    const whatsappUrl = `https://wa.me/5516997934558?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950">
      <div className="container py-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <a href="/" className="p-2 hover:bg-white/10 rounded-lg transition">
              <ArrowLeft className="w-6 h-6 text-accent" />
            </a>
            <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
              Loja <span className="text-accent">Lumina</span>
            </h1>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-3 bg-accent/20 rounded-lg hover:bg-accent/30 transition"
          >
            <ShoppingCart className="w-6 h-6 text-accent" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Produtos */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center text-muted-foreground">Carregando produtos...</div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product: any) => (
                  <Card key={product.id} className="bg-white/5 border-accent/20 overflow-hidden hover:border-accent/50 transition">
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-accent">R$ {parseFloat(product.price).toFixed(2)}</span>
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-accent hover:bg-accent/90"
                        >
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">Nenhum produto disponível</div>
            )}
          </div>

          {/* Carrinho */}
          {showCart && (
            <div className="lg:col-span-1">
              <Card className="bg-white/5 border-accent/20 p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-white mb-6">Carrinho</h2>

                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Seu carrinho está vazio</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.productId} className="flex justify-between items-start bg-white/5 p-4 rounded">
                          <div className="flex-1">
                            <p className="text-white font-semibold">{item.name}</p>
                            <p className="text-accent">R$ {parseFloat(item.price).toFixed(2)}</p>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-sm"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 bg-white/10 rounded text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Frete */}
                    <div className="mb-6 p-4 bg-white/5 rounded">
                      <label className="text-sm text-muted-foreground block mb-2">Valor do Frete (R$)</label>
                      <input
                        type="number"
                        value={shippingCost}
                        onChange={(e) => setShippingCost(e.target.value)}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 bg-white/10 border border-accent/30 rounded text-white"
                        placeholder="0.00"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Converse com nosso atendimento via WhatsApp sobre o valor do frete
                      </p>
                    </div>

                    {/* Resumo */}
                    <div className="space-y-2 mb-6 pb-6 border-b border-accent/20">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal:</span>
                        <span>R$ {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Frete:</span>
                        <span>R$ {parseFloat(shippingCost).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-accent">R$ {total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Botão WhatsApp */}
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Finalizar no WhatsApp
                    </Button>

                    {/* Info PIX */}
                    <div className="mt-4 p-4 bg-accent/10 rounded text-sm text-foreground">
                      <p className="font-semibold mb-2">Pagamento por PIX:</p>
                      <p className="text-xs">lunara_terapias@jim.com</p>
                      <p className="text-xs mt-2">Após confirmar o pedido via WhatsApp, você receberá os dados para pagamento por PIX</p>
                    </div>
                  </>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
