"""
Camada semântica — traduz o banco relacional em entidades de negócio compreensíveis.
Cada seção representa um “módulo analítico” que a Maria pode explorar no dashboard.
"""

SEMANTIC_MODEL = {
    # ======================================================
    # 🧾 VENDAS (núcleo)
    # ======================================================
    "sales": {
        "label": "Vendas",
        "description": "Informações financeiras e operacionais das vendas realizadas.",
        
        "metrics": {
            "faturamento_total": "SUM(sales.total_amount)",
            "faturamento_liquido": "SUM(sales.total_amount - sales.total_discount + sales.total_increase)",
            "quantidade_vendas": "COUNT(sales.id)",
            "ticket_medio": "AVG(sales.total_amount)",
            "taxa_descontos": "AVG(sales.total_discount)",
            "taxa_entrega_media": "AVG(sales.delivery_fee)",
            "tempo_medio_preparo": "AVG(sales.production_seconds)",
            "tempo_medio_entrega": "AVG(sales.delivery_seconds)"
        },

        "dimensions": {
            "data_venda": {
                "sql": "DATE(sales.created_at)",
                "label": "Data da Venda"
            },
            "dia_semana": {
                "sql": "TO_CHAR(sales.created_at, 'Day')",
                "label": "Dia da Semana"
            },
            "status_venda": {
                "sql": "sales.sale_status_desc",
                "label": "Status da Venda"
            },
            "canal": {
                "sql": "channels.name",
                "join": "JOIN channels ON channels.id = sales.channel_id",
                "label": "Canal de Venda"
            },
            "loja": {
                "sql": "stores.name",
                "join": "JOIN stores ON stores.id = sales.store_id",
                "label": "Loja"
            },
            "hora_venda": {
                "sql": "EXTRACT(HOUR FROM sales.created_at)",
                "label": "Hora da Venda"
            },
            "submarca": {
                "sql": "sub_brands.name",
                "join": "JOIN sub_brands ON sub_brands.id = sales.sub_brand_id",
                "label": "Submarca"
            }
        }
    },

    # ======================================================
    # 🍔 PRODUTOS
    # ======================================================
    "product_sales": {
        "label": "Produtos Vendidos",
        "description": "Relaciona produtos com suas vendas e complementos.",

        "metrics": {
            "quantidade_vendida": "SUM(product_sales.quantity)",
            "receita_total": "SUM(product_sales.total_price)",
            "preco_medio": "AVG(product_sales.base_price)",
            "vendas_por_produto": "COUNT(product_sales.id)"
        },

        "dimensions": {
            "produto": {
                "sql": "products.name",
                "join": "JOIN products ON products.id = product_sales.product_id",
                "label": "Produto"
            },
            "categoria": {
                "sql": "categories.name",
                "join": """
                    JOIN products ON products.id = product_sales.product_id
                    JOIN categories ON categories.id = products.category_id
                """,
                "label": "Categoria"
            },
            "loja": {
                "sql": "stores.name",
                "join": """
                    JOIN sales ON sales.id = product_sales.sale_id
                    JOIN stores ON stores.id = sales.store_id
                """,
                "label": "Loja"
            },
            "canal": {
                "sql": "channels.name",
                "join": """
                    JOIN sales ON sales.id = product_sales.sale_id
                    JOIN channels ON channels.id = sales.channel_id
                """,
                "label": "Canal"
            },
            "data_venda": {
                "sql": "DATE(sales.created_at)",
                "join": "JOIN sales ON sales.id = product_sales.sale_id",
                "label": "Data da Venda"
            }
        }
    },

    # ======================================================
    # 👥 CLIENTES
    # ======================================================
    "customers": {
        "label": "Clientes",
        "description": "Informações sobre clientes, frequência e engajamento.",

        "metrics": {
            "clientes_totais": "COUNT(customers.id)",
            "clientes_recorrentes": """
                COUNT(DISTINCT CASE 
                    WHEN (
                        SELECT COUNT(*) 
                        FROM sales s 
                        WHERE s.customer_id = customers.id
                    ) > 1 THEN customers.id END)
            """,
            "ticket_medio_cliente": """
                AVG((
                    SELECT AVG(s.total_amount)
                    FROM sales s
                    WHERE s.customer_id = customers.id
                ))
            """,
            "dias_desde_ultima_compra": """
                AVG(EXTRACT(DAY FROM (NOW() - (
                    SELECT MAX(s.created_at)
                    FROM sales s
                    WHERE s.customer_id = customers.id
                ))))
            """
        },

        "dimensions": {
            "nome": {
                "sql": "customers.customer_name",
                "label": "Nome do Cliente"
            },
            "email": {
                "sql": "customers.email",
                "label": "E-mail"
            },
            "genero": {
                "sql": "customers.gender",
                "label": "Gênero"
            },
            "loja": {
                "sql": "stores.name",
                "join": "JOIN stores ON stores.id = customers.store_id",
                "label": "Loja de Cadastro"
            },
            "cidade": {
                "sql": "stores.city",
                "join": "JOIN stores ON stores.id = customers.store_id",
                "label": "Cidade"
            },
            "data_cadastro": {
                "sql": "DATE(customers.created_at)",
                "label": "Data de Cadastro"
            }
        }
    },

    # ======================================================
    # ⚙️ OPERACIONAL
    # ======================================================
    "operations": {
        "label": "Operacional",
        "description": "Indicadores de performance, canais e métodos de pagamento.",

        "metrics": {
            "pedidos_entregues": """
                COUNT(CASE WHEN sales.sale_status_desc = 'Completa' THEN 1 END)
            """,
            "pedidos_cancelados": """
                COUNT(CASE WHEN sales.sale_status_desc = 'Cancelada' THEN 1 END)
            """,
            "percentual_cancelamento": """
                (COUNT(CASE WHEN sales.sale_status_desc = 'Cancelada' THEN 1 END) * 100.0) / COUNT(sales.id)
            """,
            "tempo_medio_entrega": "AVG(sales.delivery_seconds)",
            "tempo_medio_preparo": "AVG(sales.production_seconds)"
        },

        "dimensions": {
            "canal": {
                "sql": "channels.name",
                "join": "JOIN channels ON channels.id = sales.channel_id",
                "label": "Canal"
            },
            "metodo_pagamento": {
                "sql": "payment_types.description",
                "join": """
                    JOIN payments ON payments.sale_id = sales.id
                    JOIN payment_types ON payment_types.id = payments.payment_type_id
                """,
                "label": "Método de Pagamento"
            },
            "loja": {
                "sql": "stores.name",
                "join": "JOIN stores ON stores.id = sales.store_id",
                "label": "Loja"
            },
            "data_venda": {
                "sql": "DATE(sales.created_at)",
                "label": "Data da Venda"
            }
        }
    }
}


def get_semantic_schema():
    schema = {}
    for table, info in SEMANTIC_MODEL.items():
        schema[table] = {
            "label": info["label"],
            "metrics": list(info["metrics"].keys()),
            "dimensions": list(info["dimensions"].keys())
        }
    return schema
